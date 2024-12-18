/* eslint-disable react/prop-types */
import "./stylesControles.css"


const formatTime = time => {
	const minutes = Math.floor(time / 60)
	const seconds = Math.floor(time % 60)

	return `${minutes.toString().padStart(2, '0')}:${seconds
		.toString()
		.padStart(2, '0')}`
}

export const VideoControls = ({
	progress,
	duration,
	isPlaying,
	volume,
	playbackRate,
	isFullscreen,
	togglePlay,
	handleVolumeChange,
	handlePlaybackRateChange,
	toggleFullScreen,
	handleProgressChange,
}) => {
	return (
		<div
			className={`absolute bottom-0 left-0 w-full p-4 flex items-center bg-black bg-opacity-75 ${
				isPlaying ? 'hidden group-hover:flex' : ''
			}`}
		>
			<div className='flex items-center justify-between gap-3 w-full'>
				<button
					className='custom-button'
					onClick={togglePlay}
				>
					{isPlaying ? (
						<i className='bx bx-pause' id="play-icon"></i>
					) : (
						<i className='bx bx-play' id="play-icon"></i>
					)}
				</button>

				<div className='flex items-center'>
					<span className='text-white mr-2'>
						{formatTime(progress)}
					</span>
					<div className='relative w-64 h-1.5 bg-gray-600 rounded-full mr-2'>
						<input
							type='range'
							className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
							min='0'
							max={duration}
							step={1}
							value={progress}
							onChange={handleProgressChange}
						/>
						<div
							className='absolute top-0 left-0 h-full bg-blue-500 rounded-full'
							style={{ width: `${(progress / duration) * 100}%` }}
						></div>
					</div>
					<span className='text-white mr-2'>
						{formatTime(duration)}
					</span>
				</div>

				<div className='flex items-center'>
					<input
						type='range'
						className='w-16 h-1.5 bg-gray-600 rounded-full mr-2'
						min={0}
						max={1}
						step={0.1}
						value={volume}
						onChange={handleVolumeChange}
					/>
					<select
						className='bg-black text-white px-2 py-1 rounded-md focus:outline-none'
						value={playbackRate}
						onChange={handlePlaybackRateChange}
					>
						<option value='0.5'>0.5x</option>
						<option value='1'>1x</option>
						<option value='1.5'>1.5x</option>
						<option value='2'>2x</option>
					</select>
				</div>

				<button
					className='custom-button'
					onClick={toggleFullScreen}
				>
					<i className='bx bx-fullscreen' id="fl-icon"></i>
				</button>

			</div>
		</div>
	)
}
