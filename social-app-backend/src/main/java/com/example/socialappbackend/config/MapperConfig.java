package com.example.socialappbackend.config;

import com.example.socialappbackend.dto.AccountDTO;
import com.example.socialappbackend.dto.BlogDTO;
import com.example.socialappbackend.dto.UserDTO;
import com.example.socialappbackend.entity.AccountEntity;
import com.example.socialappbackend.entity.BlogEntity;
import com.example.socialappbackend.entity.UserEntity;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MapperConfig {
    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();

        modelMapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.STRICT)
                .setFieldMatchingEnabled(true)
                .setSkipNullEnabled(true)
                .setAmbiguityIgnored(true)
                .setMethodAccessLevel(org.modelmapper.config.Configuration.AccessLevel.PUBLIC)
                .setPropertyCondition(context -> context.getSource() != null);

        modelMapper.typeMap(UserEntity.class, UserDTO.class)
                .addMapping(UserEntity::getAccount, UserDTO::setAccount);

        modelMapper.typeMap(AccountEntity.class, AccountDTO.class)
                .addMapping(AccountEntity::getUser, AccountDTO::setUser);

        return modelMapper;
    }
}
