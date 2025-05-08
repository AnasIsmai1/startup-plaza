import { defineQuery } from "next-sanity";

export const STARTUPS_QUERY = defineQuery(`*[_type == "startup" && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search  ] | order(_createdAt desc){
  _createdAt,
    _id,
    author -> {
      _id,
      name,
      image
    },
    title,
    views,
    category,
    description,
    image,
    slug
}`)

export const STARTUPS_BY_ID_QUERY = defineQuery(`*[_type == "startup" && _id == $id ][0] {
    _createdAt,
    _id,
    author -> {
      _id,
      username,
      name,
      image
    },
    title,
    views,
    category,
    description,
    image,
    slug,
    pitch
}`)

export const VIEW_QUERY = defineQuery(`*[_type == "startup" && _id == $id ][0] {
    _id,
    views
}`)


export const AUTHOR_QUERY = defineQuery(`*[_type == "author" && id == $id ][0] {
  id,
    _id,
    username,
    name,
    bio,
    email,
    image
}`)

export const AUTHOR_BY_ID_QUERY = defineQuery(`*[_type == "author" && _id == $id ][0] {
  id,
    _id,
    username,
    name,
    bio,
    email,
    image
}`)

export const STARTUPS_BY_USER_ID_QUERY = defineQuery(`*[_type == "startup" &&  author._ref == $id  ] | order(_createdAt desc){
  _createdAt,
    _id,
    author -> {
      _id,
      name,
      image
    },
    title,
    views,
    category,
    description,
    image,
    slug
}`)
