// useBlogStore.ts
import { create } from "zustand"
import Cookie from "js-cookie"
import axiosInstance from "@/services/api"
import { toaster } from "@/config/config"
import { Post } from "../types/post"

interface PostFormI {
    title: string;
    content: string;
}

interface UserPostStoreTypes {
    posts: Post[];
    isFetchingPosts: boolean;
    getPosts: () => Promise<Post[]>;
    post?: (postForm: PostFormI) => Promise<void>;

    getPersonalPost: () => Promise<Post[]>;
}

export const userPostStore = create<UserPostStoreTypes>((set) => ({
    posts: [],
    isFetchingPosts: false,

    getPosts: async () => {
        set({ isFetchingPosts: true })
        try {
            const token = Cookie.get("token")
            const res = await axiosInstance.get("/api/socials/post/get-posts", {
                headers: { Authorization: `Bearer ${token}` }
            })

            const posts = res.data.posts || []

            set({
                posts,
                isFetchingPosts: false
            })

            toaster.toastS(res.data.message)
            return posts

        } catch (error: any) {
            set({
                posts: [],
                isFetchingPosts: false
            })
            toaster.toastE(error.response?.data.message)
            throw error
        }
    },

    post: async () => {
        // Implement post logic
    },

    getPersonalPost : async () => {
        set({ isFetchingPosts: true })
        try {
            const token = Cookie.get("token")
            const res = await axiosInstance.get("/api/socials/post/get-personal-posts", {
                headers: { Authorization: `Bearer ${token}` }
            })

            const posts = res.data.posts || []

            set({
                posts,
                isFetchingPosts: false
            })

            toaster.toastS(res.data.message)
            return posts

        } catch (error: any) {
            set({
                posts: [],
                isFetchingPosts: false
            })
            toaster.toastE(error.response?.data.message)
            throw error
        }
    }
    
}))