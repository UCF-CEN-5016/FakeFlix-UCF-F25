/*
    This custom React Hook provides lazy-loading functionality
    using the Intersection Observer API. Its purpose is to
    delay the loading of content until it is visible in the
    user's viewport.
*/
import { useState, useEffect, useCallback, useRef } from "react";

const useLazyLoad = (customCallback) => {
    const endPageRef = useRef(null);
    const [ isIntersecting, setIsIntersecting ] = useState(false);
    const currentRef = endPageRef.current;

    /*
        This callback function is passed to the Intersection Observer.
        It updates the isIntersecting state and executes the custom
        callback provided by the user if the element is visible.
    */
    const callbackFunction = useCallback((entries) => {
        const [ entry ] = entries;
        setIsIntersecting(entry.isIntersecting);

        if (entry.isIntersecting) customCallback();

    }, [customCallback])

    /*
        This effect sets up and cleans up the Intersection Observer.
        It attaches the observer to the endPageRef and returns a
        cleanup function to unobserve the element when the component
        unmounts, preventing memory leaks.
    */
    useEffect(() => {
        const observer = new IntersectionObserver(callbackFunction)
        if (currentRef) observer.observe(currentRef)

        return () => {
            if(currentRef) observer.unobserve(currentRef)
        }
    }, [currentRef, callbackFunction])

    return [endPageRef, isIntersecting];
}

export default useLazyLoad;