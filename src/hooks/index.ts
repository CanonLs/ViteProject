import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

// 防抖 Hook
export const useDebounce = <T>(value: T, delay: number = 500) => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay)
        return () => clearTimeout(timer)
    }, [value, delay])

    return debouncedValue
}

// 节流 Hook
export const useThrottle = <T>(value: T, delay: number = 500) => {
    const [throttledValue, setThrottledValue] = useState<T>(value)
    const lastExecuted = useRef<number>(Date.now())

    useEffect(() => {
        const now = Date.now()
        if (now >= lastExecuted.current + delay) {
            lastExecuted.current = now
            setThrottledValue(value)
        } else {
            const timer = setTimeout(() => {
                lastExecuted.current = now
                setThrottledValue(value)
            }, delay)
            return () => clearTimeout(timer)
        }
    }, [value, delay])

    return throttledValue
}

// 监听窗口大小的 Hook
export const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    })

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return windowSize
}


// 无限滚动 Hook
export const useInfiniteScroll = (callback: () => void, options = {}) => {
    const [isFetching, setIsFetching] = useState(false)
    const observer = useRef<IntersectionObserver | null>(null)
    const lastElementRef = useCallback(
        (node: HTMLElement | null) => {
            if (isFetching) return
            if (observer.current) observer.current.disconnect()

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    setIsFetching(true)
                    callback()
                    setIsFetching(false)
                }
            }, options)

            if (node) observer.current.observe(node)
        },
        [callback, isFetching, options]
    )

    return { lastElementRef, isFetching }
}

// 本地存储 Hook
export const useLocalStorage = <T>(key: string, initialValue: T) => {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        } catch (error) {
            console.error(error)
            return initialValue
        }
    })

    const setValue = (value: T | ((val: T) => T)) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value
            setStoredValue(valueToStore)
            window.localStorage.setItem(key, JSON.stringify(valueToStore))
        } catch (error) {
            console.error(error)
        }
    }

    return [storedValue, setValue] as const
}

/**
 * 记录上一次路由的值
 * 需要传入Location
 * 依赖location更新
 */
export const usePrevious = () => {
    const location = useLocation();
    const ref = useRef<Location | null>(null);
    useEffect(() => {
        ref.current = location as unknown as Location;
    }, [location]);
    return { From: ref.current?.pathname, to: location.pathname };
};
