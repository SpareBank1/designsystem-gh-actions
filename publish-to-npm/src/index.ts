import { createErrorMessage, createChangelogMessage, postSlackMessage } from './lib/slack';
import { getChangedPackages } from './lib/lerna';

const packages = getChangedPackages();

if(packages && packages.length > 0) postSlackMessage(createChangelogMessage(packages));

postSlackMessage(createErrorMessage('Zoinks', 'ErrorLogsHere'))

