function useDebounce(callback, timeout = 300) {
    let timer;

    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback.apply(this, args)
        }, timeout)
    }
}

export default useDebounce;