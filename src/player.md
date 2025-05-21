# Play Music

Top 10 songs from /api/songs/top10

🎶 All-time favorites from /api/songs/favorites

▶️ Playback controls: Play / Pause / Stop

🔀 Shuffle, ⏭ Next / ⏮ Previous

📃 Playback queue with user control

---

1. component breakdown
2. redux store design
3. user initiated operation.

---

1. Player Component
2. Song Component

```tsx
  <App>
    /music
    <MusicPlayer >
      <Thumbnail >
      <Player>
        <PlayerControl>
        <PlaybackQueue >
      </Player>
    </MusicPlayer>
    /list
      <Top10>
      <Favourite>
  </App>
```

// Redux store

```json

{
  songs: [{
    top10 :[{}]
    favourite: [{}]
    queue: [{}],
    history: [{}]
  }],
    actions : {
      shuffle:
      next:
      previous:
    }
  },
  currentSong: {{...song, isPlaying: true, isPaused: ''}}
}
```

// song in queue

```json
[
  {
    trackId: '',
    trackName: '',
    trackLength: '',
    trackTitle:
    metadata: {
      label: '',
      album: ''
    },
    addedOn: '',
    queueId: 1,
    isPlaying: true,
    isStopped: true,
    isPaused: true,
  }, {}
  ,{}
]

{'ADD_IN_QUEUE', payload: {songs: top10.songs} };
```

// on click next

1. loop through queue and find which have isPlaying: true
2. we will get the queueId of that song
3. find the song of queueId+1 < MAX_LENGTH(q)
4. change isPlaying: true to qId+1 song

// making a Queue

1. user can select song from top10 tabs / favourite tabs
2. user select a song; we push it to queue and assign a queueId sin sequence

// history of query

history : [s1, s4, s8, s9];

// shuffle

// queue [s1: 1, s2: 2]

randomId = Math.random(1, 10) => [1,4,6,7, 8, 9]
queue.map( (q, i) => ({..q, qid: randomId[i] });

queue [ s1: 8, s2: 2, s3: 1];

```tsx
Player = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [songList, setSongList] = useState([]);
  createStore({})


  useEffect(
    async () => {
    setIsLoading(true);
    try {
      const result = await fetch('/api/songs');
      const response =  await result.json();
      if(response.ok) {
        setSongList(response.json);
        setIsLoading(false);
        // dispatch an event with payload of song list
        setIsError(null);
      }
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  })

  return (

  <>
   {isLoading && <Loading>}
   {songList.length > 0 {
    <Player >
   } }
    <>
  )

}

const Player = connect(mapStateToProps, map);
```
