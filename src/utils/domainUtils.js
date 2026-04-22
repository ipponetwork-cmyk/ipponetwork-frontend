export const getDomainName = () => {
    const host = window.location.hostname;

    if (host === 'localhost') {
        return 'ippomani.com';
    }

    const parts = host.split('.');
    const index = parts.findIndex(part => part.startsWith('ippo'));

    if (index !== -1 && parts[index + 1]) {
        return `${parts[index]}.${parts[index + 1]}`;
    }

    return parts.length >= 2 ? `${parts[0]}.${parts[1]}` : host;
};


export const getDomainShortName = () => {
    const fullDomain = getDomainName();
    const short = fullDomain.split('.')[0]; // e.g. "ippomani"
    const afterIppo = short.replace(/^ippo/, ''); // e.g. "mani"
    return 'ippo' + afterIppo.charAt(0).toUpperCase() + afterIppo.slice(1); // e.g. "ippoMani"
};

