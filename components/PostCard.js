import React from 'react'
import { fontSize } from '../style'
import { spacing } from '../style'

export default function PostCard({post}) {

  const wrapper = {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  }

  const title = {
    fontSize: fontSize.fontSize4,
    fontWeight: "300",
    marginBottom: "0px"
  }
  const description = {
    fontSize: fontSize.fontSize3,
    fontWeight: "200"
  }

  return (
    <div style={wrapper}>
      <h2 style={title}>{post.frontMatter.title}</h2>
      <p style={description}>{post.frontMatter.description}</p>
    </div>
  )
}
