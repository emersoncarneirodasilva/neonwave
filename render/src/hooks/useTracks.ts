import { useState, useCallback } from "react";
import { NeonWaveAPI, type NeonWaveAPIType } from "../api/neonwave";

export function useTracks() {
  const [tracks, setTracks] = useState<
    Awaited<ReturnType<NeonWaveAPIType["listTracks"]>>
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Listar todas as tracks
  const fetchTracks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await NeonWaveAPI.listTracks();
      setTracks(data);
    } catch (err: any) {
      setError(err.message || "Erro ao buscar faixas");
    } finally {
      setLoading(false);
    }
  }, []);

  // Criar track
  const createTrack = useCallback(
    async (data: Parameters<NeonWaveAPIType["createTrack"]>[0]) => {
      setError(null);
      try {
        const newTrack = await NeonWaveAPI.createTrack(data);
        if (newTrack) setTracks((prev) => [...prev, newTrack]);
      } catch (err: any) {
        setError(err.message || "Erro ao criar faixa");
      }
    },
    []
  );

  // Atualizar track
  const updateTrack = useCallback(
    async (data: Parameters<NeonWaveAPIType["updateTrack"]>[0]) => {
      setError(null);
      try {
        const updated = await NeonWaveAPI.updateTrack(data);
        if (updated) {
          setTracks((prev) =>
            prev.map((t) => (t.id === updated.id ? updated : t))
          );
        }
      } catch (err: any) {
        setError(err.message || "Erro ao atualizar faixa");
      }
    },
    []
  );

  // Deletar track
  const deleteTrack = useCallback(async (id: number) => {
    setError(null);
    try {
      const success = await NeonWaveAPI.deleteTrack(id);
      if (success) setTracks((prev) => prev.filter((t) => t.id !== id));
    } catch (err: any) {
      setError(err.message || "Erro ao deletar faixa");
    }
  }, []);

  // Buscar track por ID
  const getTrackById = useCallback(async (id: number) => {
    setError(null);
    try {
      return await NeonWaveAPI.getTrackById(id);
    } catch (err: any) {
      setError(err.message || "Erro ao buscar faixa por ID");
      return null;
    }
  }, []);

  // Listar tracks por álbum
  const listTracksByAlbum = useCallback(async (albumId: number) => {
    setError(null);
    try {
      return await NeonWaveAPI.listTracksByAlbum(albumId);
    } catch (err: any) {
      setError(err.message || "Erro ao buscar faixas pelo álbum");
      return [];
    }
  }, []);

  // Buscar tracks por nome
  const getTracksByName = useCallback(async (name: string) => {
    setError(null);
    try {
      return await NeonWaveAPI.getTracksByName(name);
    } catch (err: any) {
      setError(err.message || "Erro ao buscar faixas pelo nome");
      return [];
    }
  }, []);

  return {
    tracks,
    loading,
    error,
    fetchTracks,
    createTrack,
    updateTrack,
    deleteTrack,
    getTrackById,
    listTracksByAlbum,
    getTracksByName,
  };
}
