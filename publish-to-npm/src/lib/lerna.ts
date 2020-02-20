import { spawnSync } from 'child_process';

export type LernaPackage = {
    name: string,
    version: string,
    private: boolean,
    location: string
}

export type PublishResponse = {
    success: boolean,
    error?: string
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
        '--yes'
    ]);

    if(publish.stderr && publish.stderr.toString().length > 0){
        return { success: false, error: publish.stderr }
    }

    return { success: true }
}
