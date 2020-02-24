import { spawnSync } from 'child_process';

export type LernaPackage = {
    name: string,
    version: string,
    private: boolean,
    location: string
}

export type PublishResponse = {
    failed: boolean,
    error: string
}

export const getChangedPackages = ():LernaPackage[] => {
    const changes = JSON.parse(
        spawnSync('npm', [
            'run',
            '--silent',
            '--',
            'lerna',
            'changed',
            '--ndjson',
        ]).stdout.toString(),
    );
    return changes instanceof Object ? [changes] : changes;
}

export const publishChangedPackages = (): PublishResponse => {
    const publish = spawnSync('npm', [
        'run',
        '--silent',
        '--',
        'lerna',
        'publish',
        '--yes',
        `--registry=https://registry.npmjs.org/:_authToken=${process.env.NPM_TOKEN}`
    ]);

    if(publish.stderr && publish.stderr.toString().length > 0){
        return { failed: true, error: publish.stderr.toString() }
    }

    return { failed: false, error: ''}
}
