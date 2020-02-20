import { spawnSync } from 'child_process';

export type LernaPackage = {
    name: string,
    version: string,
    private: boolean,
    location: string
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
