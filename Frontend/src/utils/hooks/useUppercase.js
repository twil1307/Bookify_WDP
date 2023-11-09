
function useUppercase(text) {
    return text.charAt(0).toLocaleUpperCase() + text.slice(1);
}

export default useUppercase;