const getYouTubeId=require('get-youtube-id')

function iframe(source) {
  const { url }=source
  const id=getYouTubeId(url)
  return (
    `<div class="embed-video">
          <iframe class="youtube" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" frameborder="0" src="https://www.youtube.com/embed/${id}" ></iframe>
        </div>`
  )
}

module.exports=iframe