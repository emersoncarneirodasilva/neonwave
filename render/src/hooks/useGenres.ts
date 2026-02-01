import { useState, useCallback } from "react";
import { NeonWaveAPI, type NeonWaveAPIType } from "../api/neonwave";

export function useGenres() {
  const [genres, setGenres] = useState<
    Awaited<ReturnType<NeonWaveAPIType["listGenres"]>>
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Buscar todos os gêneros
  const fetchGenres = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await NeonWaveAPI.listGenres();
      setGenres(data);
      return data;
    } catch (err: any) {
      setError(err.message || "Erro ao buscar gêneros");
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Criar gênero
  const createGenre = useCallback(
    async (data: Parameters<NeonWaveAPIType["createGenre"]>[0]) => {
      setError(null);
      try {
        const newGenre = await NeonWaveAPI.createGenre(data);
        if (newGenre) {
          setGenres((prev) => [...prev, newGenre]);
        }
        return newGenre;
      } catch (err: any) {
        setError(err.message || "Erro ao criar gênero");
        return null;
      }
    },
    []
  );

  // Buscar gênero por ID
  const getGenreById = useCallback(async (id: number) => {
    setError(null);
    try {
      const genre = await NeonWaveAPI.getGenreById(id);
      return genre;
    } catch (err: any) {
      setError(err.message || "Erro ao buscar gênero por ID");
      return null;
    }
  }, []);

  // Buscar gênero por nome
  const getGenreByName = useCallback(async (name: string) => {
    setError(null);
    try {
      const genre = await NeonWaveAPI.getGenreByName(name);
      return genre;
    } catch (err: any) {
      setError(err.message || "Erro ao buscar gênero por nome");
      return null;
    }
  }, []);

  // Atualizar gênero
  const updateGenre = useCallback(
    async (data: Parameters<NeonWaveAPIType["updateGenre"]>[0]) => {
      setError(null);
      try {
        const updatedGenre = await NeonWaveAPI.updateGenre(data);
        if (updatedGenre) {
          setGenres((prev) =>
            prev.map((g) => (g.id === updatedGenre.id ? updatedGenre : g))
          );
        }
        return updatedGenre;
      } catch (err: any) {
        setError(err.message || "Erro ao atualizar gênero");
        return null;
      }
    },
    []
  );

  // Deletar gênero
  const deleteGenre = useCallback(async (id: number) => {
    setError(null);
    try {
      const success = await NeonWaveAPI.deleteGenre(id);
      if (success) {
        setGenres((prev) => prev.filter((g) => g.id !== id));
      }
      return success;
    } catch (err: any) {
      setError(err.message || "Erro ao deletar gênero");
      return false;
    }
  }, []);

  return {
    genres,
    loading,
    error,
    fetchGenres,
    createGenre,
    getGenreById,
    getGenreByName,
    updateGenre,
    deleteGenre,
  };
}
