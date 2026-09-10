FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build

WORKDIR /src

COPY ["Banking & Financial Assistant Bot.csproj", "./"]

RUN dotnet restore "Banking & Financial Assistant Bot.csproj"

COPY . .

RUN dotnet publish "Banking & Financial Assistant Bot.csproj" -c Release -o /app/publish /p:UseAppHost=false


FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final

WORKDIR /app

COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://0.0.0.0:10000

EXPOSE 10000

ENTRYPOINT ["dotnet", "Banking & Financial Assistant Bot.dll"]