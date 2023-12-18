import {useMemo} from "react";
import {logDOM} from "@testing-library/react";

export const useSortedPosts = (posts, sort) => {
    return useMemo(() => {
        if (sort === "title") {
            return [...posts].sort((a, b) => a.title.localeCompare(b.title));
        }
        else if (sort === 'date_there') {
            return [...posts].sort((a, b) => {
                const dateA = a.date_there.split('/').reverse().join('/');
                const dateB = b.date_there.split('/').reverse().join('/');
                return new Date(dateA) - new Date(dateB);
            });
        }
        else if (sort === 'date_back') {
            return [...posts].sort((a, b) => {
                const dateA = a.date_back.split('/').reverse().join('/');
                const dateB = b.date_back.split('/').reverse().join('/');
                return new Date(dateB) - new Date(dateA);
            });
        }
        return posts;
    }, [sort, posts]);
}

export const useFilteredPosts = (posts, sort, query) => {
    const sortedPosts = useSortedPosts(posts, sort);
    return useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()));
    }, [sortedPosts, query]);
}

export const usePosts = (posts, sort, query, driverCheck, companionCheck) => {
    const sortedPosts = useFilteredPosts(posts, sort, query);
    return useMemo(() => {
            if (!driverCheck && !companionCheck) {
                return sortedPosts;
            } else if (driverCheck && companionCheck)
                return sortedPosts;
            if (driverCheck) {
                return sortedPosts.filter((el) => el.post_type.toLowerCase() === "driver");
            }
            if (companionCheck) {
                return sortedPosts.filter((el) => el.post_type.toLowerCase() === "companion");
            }
        },
        [sortedPosts, driverCheck, companionCheck]
        );
}