import { spawnSync } from 'child_process';
import { LernaPackage } from './lerna';


/* Types */

export type SlackMessage = { 
    blocks: SlackBlock[] 
}

export type SlackBlock = {
    type: string,
    text?: SlackBlockContent
}

export type SlackBlockContent = {
    type: string,
    text: string
}


/* Internal functions */

const createBlock = (blockType: string, text?: string): SlackBlock => ({
    type: blockType,
        ...(blockType !== 'divider' && {
            text: {
                type: 'mrkdwn',
                text
            }
        }
    )}
);

/* Exposed functions */

export const createErrorMessage = (errorMessage: string, errorDetails: string): SlackMessage => (
    {
        blocks: [
            createBlock('section', errorMessage),
            createBlock('section', `\`\`\`${errorDetails}\`\`\``),
        ]
    }
)

export const createChangelogMessage = (packages: LernaPackage[]): SlackMessage => (
    {
        blocks: [
            createBlock('section', `Published ${packages.length} packages to npm via GitHub Actions :truck:`),
            createBlock('divider'),
            createBlock('section',
                packages.map(pkg => `:package: ${pkg.name} was updated to ${pkg.version}`).join('\n')
            )
        ]
    }
)

export const postSlackMessage = (message: SlackMessage, token?: string, channel?: string): void => {

    const createCurlArg = (arg: string, data?: string) => ([ arg, ...(data ? [data] : []) ])
    const createCurlHeader = (header: string, content: string) => (createCurlArg('-H',`${header}: ${content}`));
    
    spawnSync('curl', [
        ...createCurlArg('-X'),
        ...createCurlArg('POST'),
        ...createCurlHeader('Content-Type', 'application/json'),
        ...createCurlHeader('Authorization', `Bearer ${ token ? token : process.env.SLACK_BOT_TOKEN}`),
        ...createCurlArg('-d', JSON.stringify({...message, channel: channel ? channel : process.env.SLACK_CHANNEL_ID })),
        ...createCurlArg('https://slack.com/api/chat.postMessage')
    ])
}


