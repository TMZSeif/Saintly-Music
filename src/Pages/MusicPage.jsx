import { useEffect, useState } from "react";
import { Link, useParams } from "react-router"
import Youtube from 'react-youtube'

export default function MusicPage() {
	const { person } = useParams()
	const [userTime, setUserTime] = useState("")
	const [username, setUsername] = useState("404 not found")
	const [videos, setVideos] = useState([])
	const [video, setVideo] = useState({})
	const [playing, setPlaying] = useState(undefined)
	const [player, setPlayer] = useState(undefined)
	const [quote, setQuote] = useState([])
	const [isReady, setIsReady] = useState(false)
	const [duration, setDuration] = useState(0)
	const [speed, setSpeed] = useState(1)
	const [volume, setVolume] = useState(100)
	const [loop, setLoop] = useState(false)
	const [shuffle, setShuffle] = useState(false)
	const [shuffledVideos, setShuffledVideos] = useState([])
	let now = new Date()
	let options;

	const getPlaylist = async playlistId => {
		const response = await fetch(`https://uug82iyqhi.execute-api.us-east-1.amazonaws.com/deploy/playlist?playlistId=${playlistId}`)
		const data = await response.json()
		setVideos(data)
		setVideo(data[0])
	}

	const onPlayerReady = (event) => {
		setPlayer(event.target)
		setIsReady(true)
		setSpeed(event.target.getPlaybackRate())
		setVolume(event.target.getVolume())
	}

	const togglePlayback = (event) => {
		setPlaying(!playing)
	}

	const changeSpeed = (event) => {
		const speeds = player.getAvailablePlaybackRates()
		let index = speeds.indexOf(speed)
		index++
		if (index === speeds.length) {
			index = 0
		}
		setSpeed(speeds[index])
		player.setPlaybackRate(speeds[index])
	}

	const shuffleChange = (event) => {
		if (!shuffle) {
			setShuffle(true)
			let shuffled = [...videos]
			for (let i = shuffled.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i+1))
				const temp = shuffled[i]
				shuffled[i] = shuffled[j]
				shuffled[j] = temp
			}
			setShuffledVideos(shuffled)
			setVideo(shuffled[0])
			setIsReady(false)
			setPlaying(false)
		}
		else {
			setShuffle(false)
			setVideo(videos[0])
			setIsReady(false)
			setPlaying(false)
		}
	}

	const seekChange = (event) => {
		setPlaying(false)
		setDuration(event.target.value)
	}

	const changeVolume = (event) => {
		setVolume(event.target.value)
		player.setVolume(event.target.value)
	}

	const seek = (event) => {
		setDuration(event.target.value)
		setPlaying(true)
		player.seekTo(event.target.value, true)
	}

	const skipSong = (event) => {
		if (isReady) {
			let index = shuffle ? shuffledVideos.indexOf(video) : videos.indexOf(video)
			index++
			if (index === videos.length) {
				index = 0
			}
			if (shuffle) {
				setVideo(shuffledVideos[index])
			}
			else {
				setVideo(videos[index])
			}
			setIsReady(false)
			setPlaying(false)
		}
	}

	const nextSong = (event) => {
		if (isReady && event.data === 0 && !loop) {
			let index = shuffle ? shuffledVideos.indexOf(video) : videos.indexOf(video)
			index++
			if (index === videos.length) {
				index = 0
			}
			if (shuffle) {
				setVideo(shuffledVideos[index])
			}
			else {
				setVideo(videos[index])
			}
			setIsReady(false)
			setPlaying(false)
		}
		if (isReady && event.data === 0 && loop) {
			setDuration(0)
			player.seekTo(0)
		}
	}

	const changeLoop = (event) => {
		setLoop(!loop)
	}

	const previousSong = (event) => {
		if (isReady) {
			let index = shuffle ? shuffledVideos.indexOf(video) : videos.indexOf(video)
			index--
			if (index === -1) {
				index = videos.length - 1
			}
			if (shuffle) {
				setVideo(shuffledVideos[index])
			}
			else {
				setVideo(videos[index])
			}
			setIsReady(false)
			setPlaying(false)
		}
	}

	useEffect(() => {
		if (isReady) {
			if (playing) {
				player.playVideo()
			}
			else {
				player.pauseVideo()
			}
		}
	}, [isReady, playing])

	useEffect(() => {
		if (!isReady) return
		const durationId = setInterval(() => {
			setDuration(player.getCurrentTime())
		}, 1000)
		return () => clearInterval(durationId)
	})

	useEffect(() => {
		const timeId = setInterval(() => {
			now = new Date()
			options ? setUserTime(now.toLocaleTimeString("en-US", options)) : setUserTime("");
		}, 50)

		switch (person) {
			case "tmzseif":
				setUsername("TMZSeif")
				options = { hour12: true, hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kuwait" }
				setQuote([
					"Red lights are for pussies. You are a penis.",
					"If your car's ever slow. Use your magical girl powers to blast through traffic.",
					"Piss neon.",
					"Glitterbomb all bad drivers.",
					"A Saint a day keeps the gays away.",
					"Do a flip. It'll be funny.",
					"Do a wheelie. It'll be cool",
					"Well they don't call it a speed bump for nothing. GO FASTER!",
					"I know what you're thinking. Do it.",
					"Got 99 problems but a bitch ain't one anymore."
				][Math.floor(Math.random() * 10)])
				getPlaylist("PL0MNHmxLfFfn74zjkvwHlO7HrU39OnIDm")
				break;
			case "cynthia":
				setUsername("Cynthia Dewdrop")
				options = { hour12: true, hour: "2-digit", minute: "2-digit", timeZone: "Asia/Dubai" }
				setQuote([
					"FUCK-FUCKING SHRED IT!",
					"OOOOH! A GAWWWWBLIN~",
					"oh shit right right the child",
					"Iiiiiiii.... Ill pop in your kissy kissy mew mew thing.",
					"im not like the other girls X"
				][Math.floor(Math.random() * 5)])
				getPlaylist("PLF5IZhAq7UikGtTwpLiG0332NrtME_8q4")
				break;
			case "sasha":
				setUsername("Sasha Nowhither")
				options = { hour12: true, hour: "2-digit", minute: "2-digit", timeZone: "Asia/Manila" }
				setQuote([
					"Remember to check for cars in your engine",
					"Tactical license holster",
					"I have no drive and I must beer"
				][Math.floor(Math.random() * 3)])
				getPlaylist("PLjOIHdv9zMMZHSMwRc2TjN0IVObUhgsxh")
				break;
			case "veil":
				setUsername("Effervescent Veil")
				options = { hour12: true, hour: "2-digit", minute: "2-digit", timeZone: "America/Chicago" }
				setQuote([
					"When you reach the light at the end of the tunnel, turn left.",
					"When in doubt, don’t.",
					"Have you heard of our lord and savior Spaghetti monster?",
					"Love is like a cake, it’s diabetic.",
					"White boys ahead, attack at your leisure.",
					"rawr x3 nuzzles pounces on u uwu u so warm~!"
				][Math.floor(Math.random() * 1)])
				getPlaylist("PL5w31yQxvxGj4sQmPsoT_XpCUIxLrRkYt")
				break;
		}

		return () => clearInterval(timeId)
	}, [])



	return (
		<div className={`container-fluid ${person}-bg`}>
			<div className="container-fluid">
				<h1 className="username">{username}</h1>
				<p className="quote">{quote}</p>
			</div>

			<div className="container-fluid">
				<h2 className="time">It is {userTime} for {person === "cynthia" || person === "sasha" ? "her" : "him"}</h2>
			</div>
			{videos.length > 0 ?
				<div className="container-fluid video-player">
					<h1 className="video-title">Current Song is: {video.snippet.title}</h1>
					<img className="img-thumbnail rounded thumbnail" src={"maxres" in video.snippet.thumbnails ? video.snippet.thumbnails.maxres.url : video.snippet.thumbnails.standard.url} />
					<Youtube className="none" videoId={video.contentDetails.videoId} opts={{
						height: '0',
						width: '0',
						playerVars: {
							controls: 1,
							disablekb: 1,
							enablejsapi: 1,
							fs: 0,
							playsinline: 1
						}
					}} onReady={onPlayerReady} onStateChange={nextSong} />
					{isReady ?
						<div className="container-fluid playback">
							<div className="container-fluid seek">
								<label htmlFor="seek" id="rangeValue" aria-hidden="true">{`${String(Math.floor(duration / 60)).padStart(2, "0")}:${String(Math.floor(duration % 60)).padStart(2, "0")}`}</label>
								<input type="range" className="form-range seekbar" onChange={seekChange} onTouchEnd={seek} onMouseUp={seek} value={duration} min="0" max={player.getDuration()} id="seek" />
							</div>
							<div className="container-fluid buttons">
								<div className="btn-group" role="group">
									<button type="button" onClick={changeSpeed} className="btn btn-green">{speed}x</button>
									<div className="btn btn-green vol">
										<input type="range" className="form-range volume" onChange={changeVolume} value={volume} min="0" max="100" id="vol" />
										<i className="fas fa-volume-up"></i>
									</div>
								</div>
								<div className="btn-group" role="group">
									<button type="button" onClick={previousSong} className="btn btn-green"><i className="fa-solid fa-backward"></i></button>
									{playing ? <button type="button" onClick={togglePlayback} className="btn btn-green"><i className="fa-solid fa-pause"></i></button> :
										<button type="button" onClick={togglePlayback} className="btn btn-green"><i className="fa-solid fa-play"></i></button>}
									<button type="button" onClick={skipSong} className="btn btn-green"><i className="fa-solid fa-forward"></i></button>
								</div>
								<div className="btn-group" role="group">
									<button type="button" onClick={shuffleChange} className="btn btn-green"><i className={`fa-solid fa-shuffle ${shuffle ? "on" : ""}`}></i></button>
									<button type="button" onClick={changeLoop} className="btn btn-green"><i className={`fa-solid fa-repeat ${loop ? "on" : ""}`}></i></button>
									<Link to="/" className="btn btn-green"><i className="fa-solid fa-arrow-left"></i></Link>
								</div>
							</div>
						</div>
						:
						<div className="container-fluid">
							<div className="spinner-border" role="status">
								<span className="visually-hidden">Loading...</span>
							</div>
						</div>
					}
				</div>
				:
				<div className="spinner-border" role="status">
					<span className="visually-hidden">Loading...</span>
				</div>}

		</div>
	)
}