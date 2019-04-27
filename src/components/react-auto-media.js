import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {MediaType} from '../lib/MediaType';
import {getMediaTypeByExt, getMediaTypeByMeta} from '../lib/GetMediaType';

export default class ReactAutoMedia extends Component {
    static propTypes = {
        src: PropTypes.string.isRequired,
        onTypeDeduced: PropTypes.func,
        linkProps: PropTypes.object,
        imageProps: PropTypes.object,
        videoProps: PropTypes.object,
        audioProps: PropTypes.object
    };

    static defaultProps = {
        onTypeDeduced: () => undefined,
        linkProps: {},
        imgProps: {},
        videoProps: {
            muted: true,
            autoPlay: true,
            controls: true
        },
        audioProps: {
            controls: true
        },
    };

    state = {
        type: MediaType.link
    };

    componentDidMount() {
        this.updateMediaType(this.props.src);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.updateMediaType(nextProps.src);
    }

    updateMediaType = (url) => {
        getMediaTypeByExt(url).then(type => {
            this.props.onTypeDeduced(type);
            this.setState({type});
        });
        getMediaTypeByMeta(url).then(type => {
            this.props.onTypeDeduced(type);
            this.setState({type});
        });
    };

    renderLink = () => <a href={this.props.src} {...this.props.linkProps}>{this.props.src}</a>;

    renderImage = () => <img src={this.props.src} {...this.props.imageProps}/>;

    renderVideo = () => <video src={this.props.src} {...this.props.videoProps}/>;

    renderAudio = () => <audio src={this.props.src} {...this.props.audioProps}/>;

    render() {
        switch(this.state.type){
            case MediaType.image:
                return this.renderImage();
            case MediaType.video:
                return this.renderVideo();
            case MediaType.audio:
                return this.renderAudio();
            default:
                return this.renderLink();
        }
    }
};

