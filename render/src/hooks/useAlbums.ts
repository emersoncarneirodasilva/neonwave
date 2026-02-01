import { useState, useCallback } from "react";
import { NeonWaveAPI, type NeonWaveAPIType } from "../api/neonwave";

export function useAlbums() {
  const [albums, setAlbums] = useState<
    Awaited<ReturnType<NeonWaveAPIType["listAlbums"]>>
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Listar todos os álbuns
  const fetchAlbums = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await NeonWaveAPI.listAlbums();
      setAlbums(data);
    } catch (err: any) {
      setError(err.message || "Erro ao buscar álbuns");
    } finally {
      setLoading(false);
    }
  }, []);

  // Criar álbum
  const createAlbum = useCallback(
    async (data: Parameters<NeonWaveAPIType["createAlbum"]>[0]) => {
      setError(null);
      try {
        const newAlbum = await NeonWaveAPI.createAlbum(data);
        if (newAlbum) setAlbums((prev) => [...prev, newAlbum]);
      } catch (err: any) {
        setError(err.message || "Erro ao criar álbum");
      }
    },
    []
  );

  // Atualizar álbum
  const updateAlbum = useCallback(
    async (data: Parameters<NeonWaveAPIType["updateAlbum"]>[0]) => {
      setError(null);
      try {
        const updated = await NeonWaveAPI.updateAlbum(data);
        if (updated) {
          setAlbums((prev) =>
            prev.map((a) => (a.id === updated.id ? updated : a))
          );
        }
      } catch (err: any) {
        setError(err.message || "Erro ao atualizar álbum");
      }
    },
    []
  );

  // Deletar álbum
  const deleteAlbum = useCallback(async (id: number) => {
    setError(null);
    try {
      const success = await NeonWaveAPI.deleteAlbum(id);
      if (success) setAlbums((prev) => prev.filter((a) => a.id !== id));
    } catch (err: any) {
      setError(err.message || "Erro ao deletar álbum");
    }
  }, []);

  // Buscar álbum por ID
  const getAlbumById = useCallback(async (id: number) => {
    setError(null);
    try {
      return await NeonWaveAPI.getAlbumById(id);
    } catch (err: any) {
      setError(err.message || "Erro ao buscar álbum por ID");
      return null;
    }
  }, []);

  // Listar álbuns por artista
  const getAlbumsByArtistId = useCallback(async (artistId: number) => {
    setError(null);
    try {
      return await NeonWaveAPI.getAlbumsByArtistId(artistId);
    } catch (err: any) {
      setError(err.message || "Erro ao buscar álbuns pelo artista");
      return [];
    }
  }, []);

  return {
    albums,
    loading,
    error,
    fetchAlbums,
    createAlbum,
    updateAlbum,
    deleteAlbum,
    getAlbumById,
    getAlbumsByArtistId,
  };
}
