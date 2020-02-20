import { createErrorMessage, createChangelogMessage, postSlackMessage } from './lib/slack';
import { getChangedPackages, publishChangedPackages } from './lib/lerna';

const packages = getChangedPackages();

if(packages && packages.length > 0){
    
    const publish = publishChangedPackages();

    if(publish.success){
        postSlackMessage(
            createChangelogMessage(packages)
            // @to-do: merge 
        );
    } else {
        postSlackMessage(
            createErrorMessage(
                `:boom: An error occured during publishing to NPM.`,
                publish.error,
            )
        );
    }

}
