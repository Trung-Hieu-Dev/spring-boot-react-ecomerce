// fake API to test how Redux work with API
export function fetchCount(amount = 1) {
    return new Promise<{data: number}>((resolve: any) => {
        setTimeout(() => {
            resolve({data: amount});
        }, 2000);
    });
}
