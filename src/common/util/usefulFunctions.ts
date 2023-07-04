export function stringToColor(string: string) {
    if (string) {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0x80;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }

    return '#ffffff';
}

export function stringAvatar(name: string) {
    return {
        children: name ? name.split(' ').length > 1 ? `${name.split(' ')[0][0]}${name.split(' ')[1][0]}` : `${name[0]}`: '',
    };
}

export function truncate(str: string | undefined, limit: number) {
    if (str) {
        return str.length > 40 ? str.substring(0, limit) + '...' : str;
    }
}

export function makeFirstLetterCapital(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}