import { useCallback, useRef } from 'react'

interface ImagePreloadOptions {
  /**
   * Maximum number of concurrent image preloads
   * Default: 3
   */
  maxConcurrent?: number
  /**
   * Timeout for image loading (in milliseconds)
   * Default: 10000 (10 seconds)
   */
  timeout?: number
}

interface PreloadResult {
  success: boolean
  url: string
  error?: string
}

/**
 * Custom hook for preloading images with queue management
 */
export const useImagePreloader = (options: ImagePreloadOptions = {}) => {
  const { maxConcurrent = 3, timeout = 10000 } = options

  const preloadedImages = useRef<Set<string>>(new Set())
  const loadingQueue = useRef<string[]>([])
  const currentlyLoading = useRef<Set<string>>(new Set())

  /**
   * Preload a single image
   */
  const preloadSingleImage = useCallback(
    (url: string): Promise<PreloadResult> => {
      return new Promise((resolve) => {
        if (preloadedImages.current.has(url)) {
          resolve({ success: true, url })
          return
        }

        const img = new Image()
        const timeoutId = setTimeout(() => {
          resolve({
            success: false,
            url,
            error: `Timeout after ${timeout}ms`,
          })
        }, timeout)

        img.onload = () => {
          clearTimeout(timeoutId)
          preloadedImages.current.add(url)
          resolve({ success: true, url })
        }

        img.onerror = () => {
          clearTimeout(timeoutId)
          resolve({
            success: false,
            url,
            error: 'Failed to load image',
          })
        }

        img.src = url
      })
    },
    [timeout]
  )

  /**
   * Process the loading queue
   */
  const processQueue = useCallback(async () => {
    while (
      loadingQueue.current.length > 0 &&
      currentlyLoading.current.size < maxConcurrent
    ) {
      const url = loadingQueue.current.shift()
      if (
        !url ||
        currentlyLoading.current.has(url) ||
        preloadedImages.current.has(url)
      ) {
        continue
      }

      currentlyLoading.current.add(url)

      try {
        await preloadSingleImage(url)
      } finally {
        currentlyLoading.current.delete(url)
      }
    }
  }, [maxConcurrent, preloadSingleImage])

  /**
   * Preload multiple images with queue management
   */
  const preloadImages = useCallback(
    async (urls: string[]): Promise<PreloadResult[]> => {
      const validUrls = urls.filter((url) => url && typeof url === 'string')

      // Add new URLs to queue
      validUrls.forEach((url) => {
        if (
          !preloadedImages.current.has(url) &&
          !loadingQueue.current.includes(url)
        ) {
          loadingQueue.current.push(url)
        }
      })

      // Start processing queue
      await processQueue()

      // Return results for the requested URLs
      return validUrls.map((url) => ({
        success: preloadedImages.current.has(url),
        url,
      }))
    },
    [processQueue]
  )

  /**
   * Preload a single image and add it to the queue
   */
  const preloadImage = useCallback(
    async (url: string): Promise<PreloadResult> => {
      if (!url) {
        return { success: false, url, error: 'Invalid URL' }
      }

      const results = await preloadImages([url])
      return results[0] || { success: false, url, error: 'Unknown error' }
    },
    [preloadImages]
  )

  /**
   * Check if an image is already preloaded
   */
  const isImagePreloaded = useCallback((url: string): boolean => {
    return preloadedImages.current.has(url)
  }, [])

  /**
   * Get preload statistics
   */
  const getStats = useCallback(() => {
    return {
      preloaded: preloadedImages.current.size,
      queued: loadingQueue.current.length,
      loading: currentlyLoading.current.size,
    }
  }, [])

  /**
   * Clear all preloaded images from cache
   */
  const clearCache = useCallback(() => {
    preloadedImages.current.clear()
    loadingQueue.current = []
    currentlyLoading.current.clear()
  }, [])

  return {
    preloadImage,
    preloadImages,
    isImagePreloaded,
    getStats,
    clearCache,
  }
}
