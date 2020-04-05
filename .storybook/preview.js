import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from 'theme/mainTheme';
import { addDecorator } from '@storybook/react';

addDecorator(story => <ThemeProvider theme={theme}>{story()}</ThemeProvider>);
