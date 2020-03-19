import {EShareOptions} from 'enums/EShareOptions'

export interface ISharingOptions {
    shareWith: EShareOptions,
    customEmails: string[],
}
