import axios from 'axios';
import { fetchPeeps } from '../../utils/fetchPeeps';
import { vi } from 'vitest'

vi.mock('axios');

describe('fetchPeeps', () => {
  it('should fetch peeps successfully', async () => {
    const data = [
      { _id: '1', message: 'Hello' },
      { _id: '2', message: 'World' },
    ];
    axios.get.mockResolvedValueOnce({ data });
    const peeps = await fetchPeeps();
    expect(peeps).toEqual(data);
  });

  it('should throw an error if peeps cannot be fetched', async () => {
    const errorMessage = 'Failed to fetch peeps';
    axios.get.mockRejectedValueOnce(new Error(errorMessage));
    await expect(fetchPeeps()).rejects.toThrow(errorMessage);
  });
});