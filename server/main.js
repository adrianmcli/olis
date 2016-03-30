import publications from './publications';
import methods from './methods';
import setupEmail from './email';
import setupUserSearchSource from './SearchSource';
import setupCloudinary from './cloudinary';
import {buildIndexes} from '/lib/collections';

publications();
methods();
setupEmail();
setupUserSearchSource();
setupCloudinary();
buildIndexes();
