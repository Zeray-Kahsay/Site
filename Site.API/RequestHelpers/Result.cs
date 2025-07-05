
namespace Site.API.RequestHelpers;

public record Result<T>
{
    public bool IsSuccess { get; set; }
    public T? Data { get; set; }
    public int Id { get; set; }
    public IEnumerable<string> Errors { get; set; } = [];
    public bool IsServiceUnavailable { get; set; }

    public static Result<T> Success(T data) => new() { IsSuccess = true, Data = data };
    public static Result<T> Failure(string error, bool isServiceUnavailable = false) =>
         new() { IsSuccess = false, Errors = new[] { error }, IsServiceUnavailable = isServiceUnavailable };
    public static Result<T> Failure(IEnumerable<string> errors, bool isServiceUnavailable = false) =>
        new() { IsSuccess = false, Errors = errors, IsServiceUnavailable = isServiceUnavailable };
}


public record Result
{
    public bool IsSuccess { get; set; }
    public IEnumerable<string> Errors { get; set; } = [];

    public static Result Success() => new() { IsSuccess = true };
    public static Result Failure(params string[] errors) => new() { IsSuccess = false, Errors = errors };
    public static Result Failure(IEnumerable<string> errors) => new() { IsSuccess = false, Errors = errors };
}
