import {css, html, LitElement} from 'lit-element';

class KaraokeNight extends LitElement {
    constructor() {
        super();

        this.entry_header = 'Get on the list';
        this.list_header = 'The List';
        this.entries = [
            {singer: 'Chris Weber', song: 'Love Me Now', artist: 'John Legend'},
            {singer: 'Chris Weber', song: 'Counting Stars', artist: 'OneRepublic'},
            {singer: 'Someone Else', song: 'Rise Up', artist: 'Andra Day'},
        ];
        this.singer = null;
        this.song = null;
        this.artist = null;
        this.link = null;
    }

    static get properties() {
        return {
            entry_header: {type: String},
            list_header: {type: String},
            entries: {type: Array},
            singer: {type: String},
            song: {type: String},
            artist: {type: String},
            link: {type: String},
        };
    }

    static get styles() {
        return [
            css`
        :host {
          text-align: center;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: calc(10px + 2vmin);
          color: #1a2b42;
          
          --missing-data: red;
          --missing-link: yellow;
        }
        .input-missing {
            outline: 1px solid red;
        }

        header {
          margin: auto;
        }

        a {
          color: #217ff9;
        }
      `,

        ];
    }
    evalInput(e) {
      let name = e.target.getAttribute('name');
      if (this[name] == null || this[name] == '') {
        e.target.classList.add('input-missing');
      }
      else {
        e.target.classList.remove('input-missing');
      }
    }
    render() {
        return html`
      <header>
        <h2>${this.entry_header}</h2>
        <div>
          <div><input name="singer" @mouseout=${this.evalInput} @focusout=${this.evalInput} value="${this.singer !== null ? this.singer : ''}" id="singer" type="text" size="30" placeholder="Enter your name here"></div>
          <div><input name="song" value="${this.song !== null ? this.song : ''}" id="song" type="text" size="30" placeholder="Enter the song name here"></div>
          <div><input name="artist" value="${this.artist !== null ? this.artist : ''}" id="artist" type="text" size="30" placeholder="Enter the artist name here"></div>
          <div>
            <div>Have a specific video to link?</div>
            <div><input name="link" value="${this.link !== null ? this.link : ''}" id="link" type="text" size="30" placeholder="Copy and paste the url here"></div>
          </div>
          <div><karaoke-button .singer=${this.singer} .song=${this.song} .artist=${this.artist} .link=${this.link} @click=${this.handleClick}>Add to list</karaoke-button></div>  
        </div>
        <div><label>Provide your name, the name of the song, and the name the song's artist here.</label></div>
        
      </header>
      <h2>${this.list_header}</h2>
      <div class="append-list">
        ${this.entries.map(entry => html`
            <karaoke-item .singer=${entry.singer} .song=${entry.song} .artist=${entry.artist} ></karaoke-item>
        `)}
      </div>
    `;
    }

    handleClick() {
        const newSinger = this.shadowRoot.getElementById('singer').value;
        const newSong = this.shadowRoot.getElementById('song').value;
        const newArtist = this.shadowRoot.getElementById('artist').value;
        const newLink = this.shadowRoot.getElementById('link').value;
        this.entries = [
            ...this.entries,
            {singer: newSinger, song: newSong, artist: newArtist},
        ];

        this.dispatchEvent(new CustomEvent('event-fired', {detail: 'Tried to save data.'}));
    }
}

customElements.define('karaoke-night', KaraokeNight);

class KaraokeItem extends LitElement {
    constructor() {
        super();
        this.singer = 'Sammy';
        this.song = 'Sings it';
        this.artist = "The Sammies";
    }

    static get properties() {
        return {
            singer: {type: String},
            song: {type: String},
            artist: {type: String},
            link: {type: String},
        };
    }

    static get styles() {
        return [
            css`
        :host {
          display: grid;
            grid-template-columns: auto auto;
            border: 3px #444 solid;
            margin: 3px;
            padding-left: 5px;
            background-color: #805e9c;
            text-align: left;
            min-width: 1fr;
            
        }

        .col {
            vertical-align: top;
        }
        
        .singer {
            font-size: 32px;
        }
        
        .song {
            font-size: 24px;
        }
        
        .artist {
            font-size: 16px;
        }
      `,
        ];
    }

    render() {
        return html`

      <a href="${this._getLink()}" alt="youtube karaoke ${this.song} ${this.artist}" target="KaraokeTargetTab">
      <div>
          <div class="col">
              <div class="singer">
                  ${this.singer}
              </div>
          </div>
          <div class="col">
              <div class="song">
                  ${this.song}
              </div>
              <div class="artist">
                  By ${this.artist}
              </div>
          </div>
      </div>
      </a>
    `;
    }

    _getLink() {
        if (this.link) {
            return this.link;
        }

        return `https://www.youtube.com/results?search_query=karaoke+${this.song.toString().replace(" ", "+")}+${this.artist.toString().replace(" ", "+")}`;
    }
}

customElements.define('karaoke-item', KaraokeItem);

class ValidatingButton extends LitElement {
    constructor() {
        super();
        this.title = "Add to List";
        this.singer = null;
        this.song = null;
        this.artist = null;
        this.link = null;

        this.missingData = !this.singer || !this.song || !this.artist;
        this.missingLink = !this.link;
    }

    static get properties() {
        return {
            title: {type: String},
            singer: {type: String},
            song: {type: String},
            artist: {type: String},
            link: {type: String},

        };
    }

    static get styles() {

        return [
            css`
        :host {
          display: block; 
          --missing-data: red;
          --missing-link: yellow;   
        }
       
        .error {
          background-color: red;
        }
        .missingLink {
          background-color: yellow
        }
      `,
        ];
    }

    render() {
        if (this.missingData) {
            return html`
      <button class="${'error'}">${this.title}</button>
    `;
        }

        return html`
      <button class="${this.missingLink ? 'missingLink' : null}">${this.title}</button>
    `;

    }

}

customElements.define('karaoke-button', ValidatingButton);
