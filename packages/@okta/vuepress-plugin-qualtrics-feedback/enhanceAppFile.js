export default () => {
    if (process.env.NODE_ENV === 'production' && typeof document !== 'undefined') {
        (function () {
            // Making this a no-op
            // Refactoring the feedback widget as a component
        }())
    }
}
