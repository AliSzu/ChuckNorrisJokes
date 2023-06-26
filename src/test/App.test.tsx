import renderer from 'react-test-renderer';
import { expect, it } from 'vitest'
import App from '../App';

it('initial render', () => {
  const tree = renderer
    .create(<App/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
