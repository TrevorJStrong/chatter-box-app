import React from "react";
import { Control, Controller, FieldErrors, FieldValues } from 'react-hook-form';
import { View, Switch, StyleProp, ViewStyle } from "react-native";
import { RadioButton, TextInput, TextInputProps, Text } from "react-native-paper";
import { COLOURS } from "../../constants";

interface FormFieldControllerProps {
    control: Control<{}>
    type: 'input' | 'textarea' | 'switch' | 'radio';
    errors?: FieldErrors<FieldValues>;
    isRequired: boolean;
    name: string;
    label: string;
    placeholder?: string;
    style?: StyleProp<ViewStyle>;
    props?: TextInputProps
};

const renderInput = ({ label, placeholder, value, onChange, onBlur, style, props }: any) => (
    <TextInput
        label={label}
        placeholder={placeholder}
        onChangeText={onChange}
        value={value}
        onBlur={onBlur}
        style={[{ marginVertical: 5 }, style]}
        {...props}
    />
);

const renderTextarea = ({ label, placeholder, value, onChange, onBlur, style, props }: any) => (
    <TextInput
        label={label}
        placeholder={placeholder}
        onChangeText={onChange}
        value={value}
        onBlur={onBlur}
        multiline
        numberOfLines={4}
        style={[{ marginVertical: 5 }, style]}
        {...props}
    />
);

const renderSwitch = ({ value, onChange, style }: any) => (
    <Switch
        value={value}
        onValueChange={onChange}
        style={[{ marginVertical: 5 }, style]}
    />
);

const renderRadio = ({ value, onChange }: any) => (
    <RadioButton.Group onValueChange={onChange} value={value}>
        <RadioButton.Item label="Option 1" value="option1" />
        <RadioButton.Item label="Option 2" value="option2" />
    </RadioButton.Group>
);

const renderField = (type: FormFieldControllerProps['type'], fieldProps: any) => {
    switch (type) {
        case 'input':
            return renderInput(fieldProps);
        case 'textarea':
            return renderTextarea(fieldProps);
        case 'switch':
            return renderSwitch(fieldProps);
        case 'radio':
            return renderRadio(fieldProps);
        default:
            return renderInput(fieldProps);
    }
};

const FormFieldController = ({
    control,
    errors,
    type,
    name,
    isRequired = false,
    placeholder,
    label = '',
    style,
    props,
}: FormFieldControllerProps) => (
    <View>
        {label ? <Text>{label}</Text> : null}
        <Controller
            control={control}
            name={name}
            rules={{ required: isRequired }}
            render={({ field: { onChange, onBlur, value } }) => (
                renderField(type, { label, placeholder, value, onChange, onBlur, style, props })
            )}
        />
        {errors && errors[name] && <Text variant='bodyMedium' style={{ color: COLOURS.error }}>{errors[name].message}</Text>}
    </View>
);

export default FormFieldController;
