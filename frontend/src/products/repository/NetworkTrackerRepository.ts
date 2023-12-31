

export interface TrackerRepository {
    getProject(): Promise<any>
}

export default class NetworkTrackerRepository implements TrackerRepository {
    async getProject(): Promise<any> {
        const res = await fetch('/api/akiya')
        return res.json()
    }

}