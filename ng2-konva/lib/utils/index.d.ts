import updatePicture from './updatePicture';
import applyNodeProps from './applyNodeProps';
import { KonvaComponent } from '../interfaces/ko-component.interface';
import { ListenerRecord } from './types';
export declare function getName(componentTag: string): string;
export declare function createListener(instance: KonvaComponent): ListenerRecord;
export { updatePicture, applyNodeProps };
