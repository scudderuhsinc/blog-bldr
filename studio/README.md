# blog-bldr-studio

## NOTES

// "project": {
//   "name": "Blog Builder"
// },
// "api": {
//   "projectId": "qczuunwb",
//   "dataset": "production"
// },

https://gist.github.com/runeb/6df439900232e34d7009bfd0cd44c3bc

sk1fn7AV8SStkLeqwnRj6L6TggudB0UZ0xC0Wt8Uu2KLQt85i081XTBInLsAWJwGPn0m8FQbTF4HQvsl5v1r8cXIzORWjEGWMCjiGY1uAVeDZvZ7rHh148q1jG3vEOoB1Yv5vZvJmcFfhSywSlLkoLzQbOpwb3UNbSKAoMZz35StxjbwNMYk

file: role_contributing-writer,json,
file: role_staff-writter.json
{
  "_id": "_.groups.staff_writer",
  "_type": "system.group",
  "grants": [
    {
      "filter": "_type == 'categories'",
      "permissions": ["read", "create"]
    },
    {
      "filter": "_type == 'post'",
      "permissions": ["read", "update", "create"]
    }
  ],
  "members": ["e-a-user-id", "e-another-user-id"]
}

Run this command `SANITY_AUTH_TOKEN=<your token> sanity documents create <filename.json> --replace`
https://github.com/sanity-io/3rd-party-auth-example
https://github.com/sanity-io/3rd-party-auth-example

https://www.sanity.io/docs/third-party-login

https://www.sanity.io/blog/design-with-real-content-how-to-connect-sanity-with-sketch-using-craft-s-invision-plugin
