import React from 'react';

import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import ReactAutoMedia from '../components/react-auto-media';

const reimuPng = "https://en.touhouwiki.net/images/thumb/2/25/Th075reimu01.png/256px-Th075reimu01.png";
const billyWebm = "https://nazrin.awooo.ru/_/19ab20cedf45b3140a614a5fd85960c2.webm";
const napasMp3 = "https://nazrin.awooo.ru/_/c0519416c034cfac2964ce03aaf532fd.mp3";

storiesOf('ReactAutoMedia', module)
    .add('with link', () => <ReactAutoMedia src="https://awooo.ru/" onTypeDeduced={action("Type Deduced")}/>)
    .add('with image', () => <ReactAutoMedia src={reimuPng} onTypeDeduced={action("Type Deduced")}/>)
    .add('with video', () => <ReactAutoMedia src={billyWebm} onTypeDeduced={action("Type Deduced")}/>)
    .add('with audio', () => <ReactAutoMedia src={napasMp3} onTypeDeduced={action("Type Deduced")}/>);