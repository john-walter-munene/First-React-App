import { React } from 'react';

class SoccerMemoryCardGameHouse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      soccerPhotoCards: [],
      scores: { currentScore: 0, bestScore: 0 },
    };

    // Track if component is mounted
    this._isMounted = false;

     this.handleRestart = this.handleRestart.bind(this);
  }

  async fetchGIFs() {
    const gifAPI = new GiphyFetch("cdV83dbgRL2VFc2iNoBozLAQFezGJQY6");
    const { data: soccerGIFs } = await gifAPI.search("soccer", {
      limit: 50,
      type: "stickers",
    });

    if (this._isMounted && soccerGIFs) {
      const lightSoccerGIFs = adaptGIFsToLightWeight(soccerGIFs);
      const uniqueMap = new Map();
      lightSoccerGIFs.forEach((gif) => {
        if (!uniqueMap.has(gif.caption)) uniqueMap.set(gif.caption, gif);
      });

      this.setState({
        soccerPhotoCards: shuffleArray(Array.from(uniqueMap.values())),
      });
    }
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchGIFs();
  }

  componentWillUnmount() {
    this._isMounted = false; // cleanup: prevent state updates
  }

  handleRestart = () => {
    this.setState((prevState) => ({
      soccerPhotoCards: shuffleArray(
        prevState.soccerPhotoCards.map((card) => ({ ...card, clicked: false }))
      ),
      scores: { ...prevState.scores, currentScore: 0 },
    }));
  };

  render() {
    const { soccerPhotoCards, scores } = this.state;

    return (
      <div className="soccer-memory-house">
        <GameHeader scores={scores} />
        <SoccerGameBoard
          soccerGIFs={soccerPhotoCards}
          scores={scores}
          onSoccerPhotoCardsChange={(cards) =>
            this.setState({ soccerPhotoCards: cards })
          }
          onScoresChange={(scores) => this.setState({ scores })}
          onRestartGame={this.handleRestart}
        />
      </div>
    );
  }
}


export { SoccerMemoryCardGameHouse };

function adaptGIFsToLightWeight() {}
function GiphyFetch() {}
function shuffleArray() {}