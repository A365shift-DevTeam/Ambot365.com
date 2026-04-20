FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build

WORKDIR /src

COPY NuGet.Config ./
COPY A365Shift.Api/A365Shift.Api.csproj A365Shift.Api/
RUN dotnet restore A365Shift.Api/A365Shift.Api.csproj --configfile NuGet.Config

COPY . .
RUN dotnet publish A365Shift.Api/A365Shift.Api.csproj -c Release -o /app/publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime

WORKDIR /app

COPY --from=build /app/publish .

EXPOSE 8080

ENTRYPOINT ["dotnet", "A365Shift.Api.dll"]
