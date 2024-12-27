import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private readonly supabase: SupabaseClient;

  constructor() {
    const supabaseUrl = 'https://ckegikmmxzzqxrstwwob.supabase.co';
    const supabaseKey =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrZWdpa21teHp6cXhyc3R3d29iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ0Njg0NjMsImV4cCI6MjA1MDA0NDQ2M30.b0a-XP1w97nk9quSifc59Ae3PAgmcHPlXgvHns4cRXk';

    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async testConnection(): Promise<boolean> {
    try {
      // Tente listar tabelas do banco de dados (ou qualquer query)
      const { data, error } = await this.supabase
        .from('Newsletter')
        .select('*');
      if (error) throw error;

      console.log('Conexão bem-sucedida:', data);
      return true;
    } catch (error) {
      console.error('Erro ao conectar ao Supabase:', error.message);
      return false;
    }
  }
}
