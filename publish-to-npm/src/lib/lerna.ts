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

    const lernaOutput = spawnSync('npm', [
        'run',
        '--silent',
        '--',
        'lerna',
        'changed',
        '--json',
    ]).stdout.toString();

    return lernaOutput.length > 0 ? JSON.parse(lernaOutput) : null;
}

export const publishChangedPackages = (): PublishResponse => {
    const publish = spawnSync('npm', [
        'run',
        '--silent',
        '--',
        'lerna',
        'publish',
        '--yes'
    ]);

    if(publish.stderr && publish.stderr.toString().length > 0){
        return { failed: true, error: publish.stderr.toString() }
    }

    return { failed: false, error: ''}
}
