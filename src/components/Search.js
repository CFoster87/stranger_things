import React, { useState } from "react";



export default function Search(props){
    const { posts, setFilteredPosts, searchTerm, setSearchTerm } = props

    const handleSubmit = (e) => {
        e.preventDefault()
        const filtered = posts.filter(post => postMatches(post, searchTerm))
        console.log(filtered)
        setFilteredPosts(filtered)


    }

    function postMatches(posts, text) {

        return posts.title.includes(text)

    }

    const searchStyle = {
        input: {
            minWidth: "87vw",
            margin: "5px",
        }
    }

    return <span>
        <form onSubmit={handleSubmit}>
            <input style={searchStyle.input} type="text" onChange={(e) => setSearchTerm(e.target.value)}></input>
            <button type="submit"  >Search</button>
            <button onClick={() => setSearchTerm('')}>Clear</button>
        </form>
    </span>
}