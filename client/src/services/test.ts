import { ApiService } from './api';

export class TestService extends ApiService {
    constructor() {
        super();
    }

    async getTest() {
        try {
            const response = await this.request('GET', '/', null);
            const { statusText, status, data } = response;
            return { statusText, status, data };
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
