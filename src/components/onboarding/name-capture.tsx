'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import LiquidGlass from 'liquid-glass-react';

interface NameCaptureProps {
  onNameSubmit: (name: string, audioBlob?: Blob) => void;
}

export const NameCapture: React.FC<NameCaptureProps> = ({ onNameSubmit }) => {
  const [name, setName] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Speech recognition setup
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setName(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      if (isListening) {
        recognition.start();
      }

      return () => {
        recognition.stop();
      };
    }
  }, [isListening]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setAudioBlob(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsListening(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isListening) {
      mediaRecorderRef.current.stop();
      setIsListening(false);
    }
  };

  const playAudio = () => {
    if (audioBlob) {
      const audio = new Audio(URL.createObjectURL(audioBlob));
      setIsPlaying(true);
      audio.play();
      audio.onended = () => setIsPlaying(false);
    }
  };

  const handleSubmit = () => {
    if (name.trim()) {
      onNameSubmit(name.trim(), audioBlob || undefined);
    }
  };

  const handleVoiceInput = () => {
    if (isListening) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        <LiquidGlass
          displacementScale={40}
          blurAmount={0.15}
          saturation={120}
          aberrationIntensity={1}
          elasticity={0.2}
          cornerRadius={24}
          className="p-8 border border-border/30"
        >
          <div className="text-center space-y-6">
            {/* AI Avatar */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-accent to-emphasis flex items-center justify-center text-white text-2xl font-bold"
            >
              AI
            </motion.div>

            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="space-y-3"
            >
              <h1 className="text-2xl font-bold text-foreground">
                Hello! I'm your language tutor.
              </h1>
              <p className="text-muted-foreground">
                What's your name? You can type it or say it out loud.
              </p>
            </motion.div>

            {/* Name Input */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="space-y-4"
            >
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Enter your name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pr-12 text-center text-lg"
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={handleVoiceInput}
                >
                  {isListening ? (
                    <MicOff size={16} className="text-red-500" />
                  ) : (
                    <Mic size={16} className="text-muted-foreground" />
                  )}
                </Button>
              </div>

              {/* Audio playback */}
              {audioBlob && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={playAudio}
                  disabled={isPlaying}
                  className="w-full"
                >
                  <Volume2 size={16} className="mr-2" />
                  {isPlaying ? 'Playing...' : 'Play recording'}
                </Button>
              )}

              {/* Status */}
              {isListening && (
                <p className="text-sm text-accent animate-pulse">
                  Listening... Speak your name clearly
                </p>
              )}

              {/* Submit Button */}
              <Button
                onClick={handleSubmit}
                disabled={!name.trim()}
                className="w-full"
                size="lg"
              >
                Continue
              </Button>
            </motion.div>
          </div>
        </LiquidGlass>
      </motion.div>
    </div>
  );
};