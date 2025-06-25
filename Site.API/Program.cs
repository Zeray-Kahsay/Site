using Site.API.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddApplicationServices(builder.Configuration);



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(opt =>
   {
       opt.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins([
           "http://localhost:3000",
            "https://localhost:3000"
       ]);
   });

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
