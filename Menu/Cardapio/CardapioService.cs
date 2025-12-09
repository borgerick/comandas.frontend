using System.Net.Http;
using System.Net.Http.Json;

public class CardapioService
{
    private readonly HttpClient _http;
    private const string BaseUrl = "http://localhost:7170/api/CardapioItem";

    public CardapioService()
    {
        _http = new HttpClient();
    }

    // GET ALL
    public async Task<List<CardapioItemResponse>> GetAllAsync()
    {
        var result = await _http.GetFromJsonAsync<List<CardapioItemResponse>>(BaseUrl);
        return result ?? new List<CardapioItemResponse>();
    }

    // GET BY ID
    public async Task<CardapioItemResponse?> GetByIdAsync(int id)
    {
        return await _http.GetFromJsonAsync<CardapioItemResponse>($"{BaseUrl}/{id}");
    }

    // CREATE
    public async Task<bool> CreateAsync(CardapioItemCreateRequest dto)
    {
        var response = await _http.PostAsJsonAsync(BaseUrl, dto);
        return response.IsSuccessStatusCode;
    }

    // UPDATE
    public async Task<bool> UpdateAsync(int id, CardapioItemUpdateRequest dto)
    {
        var response = await _http.PutAsJsonAsync($"{BaseUrl}/{id}", dto);
        return response.IsSuccessStatusCode;
    }

    // DELETE
    public async Task<bool> DeleteAsync(int id)
    {
        var response = await _http.DeleteAsync($"{BaseUrl}/{id}");
        return response.IsSuccessStatusCode;
    }
}
