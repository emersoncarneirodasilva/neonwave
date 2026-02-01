import { useState, useCallback } from "react";
import { NeonWaveAPI, type NeonWaveAPIType } from "../api/neonwave";

export function useArtists() {
  const [artists, setArtists] = useState<
    Awaited<ReturnType<NeonWaveAPIType["listArtists"]>>
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Listar artistas
  const fetchArtists = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await NeonWaveAPI.listArtists();
      setArtists(data);
    } catch (err: any) {
      setError(err.message || "Erro ao buscar artistas");
    } finally {
      setLoading(false);
    }
  }, []);

  // Criar artista
  const createArtist = useCallback(
    async (data: Parameters<NeonWaveAPIType["createArtist"]>[0]) => {
      setError(null);
      try {
        const newArtist = await NeonWaveAPI.createArtist(data);
        if (newArtist) setArtists((prev) => [...prev, newArtist]);
      } catch (err: any) {
        setError(err.message || "Erro ao criar artista");
      }
    },
    []
  );

  // Atualizar artista
  const updateArtist = useCallback(
    async (data: Parameters<NeonWaveAPIType["updateArtist"]>[0]) => {
      setError(null);
      try {
        const updated = await NeonWaveAPI.updateArtist(data);
        if (updated) {
          setArtists((prev) =>
            prev.map((a) => (a.id === updated.id ? updated : a))
          );
        }
      } catch (err: any) {
        setError(err.message || "Erro ao atualizar artista");
      }
    },
    []
  );

  // Deletar artista
  const deleteArtist = useCallback(async (id: number) => {
    setError(null);
    try {
      const success = await NeonWaveAPI.deleteArtist(id);
      if (success) setArtists((prev) => prev.filter((a) => a.id !== id));
    } catch (err: any) {
      setError(err.message || "Erro ao deletar artista");
    }
  }, []);

  // Buscar artista por ID
  const getArtistById = useCallback(async (id: number) => {
    setError(null);
    try {
      return await NeonWaveAPI.getArtistById(id);
    } catch (err: any) {
      setError(err.message || "Erro ao buscar artista por ID");
      return null;
    }
  }, []);

  // Buscar artista por nome
  const getArtistByName = useCallback(async (name: string) => {
    setError(null);
    try {
      return await NeonWaveAPI.getArtistByName(name);
    } catch (err: any) {
      setError(err.message || "Erro ao buscar artista por nome");
      return null;
    }
  }, []);

  // Listar artistas por gênero
  const listArtistsByGenre = useCallback(async (genreId: number) => {
    setError(null);
    try {
      return await NeonWaveAPI.listArtistsByGenre(genreId);
    } catch (err: any) {
      setError(err.message || "Erro ao buscar artistas por gênero");
      return [];
    }
  }, []);

  return {
    artists,
    loading,
    error,
    fetchArtists,
    createArtist,
    updateArtist,
    deleteArtist,
    getArtistById,
    getArtistByName,
    listArtistsByGenre,
  };
}
