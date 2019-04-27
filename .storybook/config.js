import {addDecorator, configure} from '@storybook/react';
import {withInfo} from '@storybook/addon-info';

function loadStories() {
    require('../src/stories/index.js');
}

addDecorator(withInfo);
configure(loadStories, module);
